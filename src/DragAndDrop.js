import React, { createContext, useContext, useState } from 'react';

const DragAndDropContext = createContext();

const Provider = ({ children }) => {
  const [dragging, setDragging] = useState(null);

  return (
    <DragAndDropContext.Provider value={{ dragging, setDragging }}>
      {children}
    </DragAndDropContext.Provider>
  );
};

const Draggable = ({ i, render }) => {
  const { setDragging } = useContext(DragAndDropContext);

  return render({
    draggable: true,
    onDragEnd: () => setDragging(null),
    onDragStart: () => setDragging(i)
  });
};

const Droppable = ({ droppable, i, onDrop, render }) => {
  const { dragging } = useContext(DragAndDropContext);

  return render({
    onDragOver: e => e.preventDefault(),
    onDrop: () => droppable && dragging !== null && onDrop(dragging, i)
  });
};

export default {
  Provider,
  Draggable,
  Droppable
};
