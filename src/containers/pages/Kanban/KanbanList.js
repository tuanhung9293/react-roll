import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import moment from 'moment';
import { orderStatus } from './../../../constants/commonData';
import { DeliveryModal } from './../../../components/element/index';

class KanbanList extends Component {
    state = {
        draggingItem: {},
        newindex: 0,
    }

    onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if(source.droppableId !== destination.droppableId) {
            if(destination.droppableId === orderStatus.DELIVERED) {
                const selectedList = _.find(this.props.arrangedList, list => {
                    return list.id === source.droppableId;
                }).list;
                const selectedItem = _.find(selectedList, item => {
                    return item.id === result.draggableId;
                })
                this.setState({
                    draggingItem: selectedItem,
                    newindex: destination.index
                }, () => {
                    this.props.handleOpentDeliveryModal();
                })
            } else {
                let sourceList = _.find(this.props.arrangedList, list => {
                    return list.id === source.droppableId;
                }).list;
              
                const result = this.move(
                    sourceList,
                    source,
                    destination,
                );
    
                this.props.handleEditOrder(result, destination.index);
            }
        }
        
        // move item into the same list
        //if (source.droppableId === destination.droppableId) {
            // const items = reorder(
            //     this.getList(source.droppableId),
            //     source.index,
            //     destination.index
            // );

            // let state = { items };

            // if (source.droppableId === 'droppable2') {
            //     state = { selected: items };
            // }

            // this.setState(state);
        //}
    };

    /*
    ** Moves an item from one list to another list.
    */
    move = (source, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        let [removed] = sourceClone.splice(droppableSource.index, 1);
        removed.status = droppableDestination.droppableId;
        return removed;
    };

    handleShowDetail = (item) => {
        console.log("item?>?>?>?>?>?>?", item);
    }

    render() {
        const {
            arrangedList,
            t,
            isShowDeliveryModal,
            handleSubmitDeliveryModal,
            handleCloseDeliveryModal,
            isSubmittingDeliveryModal,
        } = this.props;

        const { 
            draggingItem,
            newindex
        } = this.state;

        return (
            <div className="kanban-list">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {_.map(arrangedList, (selectedlist, listIndex) => {
                        return(
                            <Droppable droppableId={selectedlist.id} key={listIndex}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={`list-content  ${snapshot.isDraggingOver ? 'dragging-list-content': ''}`}
                                    >
                                        <div className="list-title">
                                            {t(selectedlist.id)}
                                        </div>
                                        {selectedlist.list.map((item, index) => (
                                            <Fragment key={index}>
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            onClick={() => this.handleShowDetail(item)}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{...provided.draggableProps.style}}
                                                            className={`item-style 
                                                                ${snapshot.isDragging 
                                                                    ? 'dragging-item'
                                                                    : moment().isAfter(item.due_date, 'day') && selectedlist.id !== orderStatus.DELIVERED 
                                                                        ? 'isLate-item'
                                                                        : ''
                                                                }`
                                                            }
                                                        >
                                                            <div className="customer-name">
                                                                {item.customer.name}
                                                            </div>
                                                            <div>
                                                                {JSON.parse(item.contents)[0].content}
                                                            </div>
                                                            <div>
                                                                {t('dueDay')}: {moment(item.due_date).format("DD/MM/YYYY")}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            </Fragment>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    })}
                </DragDropContext>
                <DeliveryModal
                    data={draggingItem}
                    show={isShowDeliveryModal}
                    onHide={handleCloseDeliveryModal}
                    onSubmit={handleSubmitDeliveryModal}
                    disabled={isSubmittingDeliveryModal}
                    newindex={newindex}
                />
            </div>
        );
    }
}

KanbanList.propTypes = {
    arrangedList: PropTypes.array.isRequired,
    handleEditOrder: PropTypes.func.isRequired,
}

KanbanList.defaultProps = {
    arrangedList: [],
}

export default KanbanList;