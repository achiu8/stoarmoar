import React, { createContext, useContext, useState } from 'react';

const DragAndDropContext = createContext();

const Provider = ({ children }) => {
  const [dragging, setDragging] = useState(null);
  const [dropping, setDropping] = useState(null);

  return (
    <DragAndDropContext.Provider value={{
      dragging,
      setDragging,
      dropping,
      setDropping
    }}>
      {children}
    </DragAndDropContext.Provider>
  );
};

const Draggable = ({ i, render }) => {
  const { setDragging, setDropping } = useContext(DragAndDropContext);

  return render({
    draggable: true,
    onDragEnd: () => {
      setDragging(null);
      setDropping(null);
    },
    onDragStart: () => setDragging(i)
  });
};

const Droppable = ({ droppable, i, onDrop, render }) => {
  const { dragging, dropping, setDropping } = useContext(DragAndDropContext);

  return render({
    dropping: droppable && dropping === i,
    onDragOver: e => e.preventDefault(),
    onDragEnter: () => setDropping(i),
    onDrop: () => {
      droppable && dragging !== null && onDrop(dragging, i);
      setDropping(null);
    }
  });
};

export default {
  Provider,
  Draggable,
  Droppable
};
