import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [dragging, setDragging] = useState(null);
  const [dropping, setDropping] = useState({});

  return (
    <Context.Provider value={{
      dragging,
      setDragging,
      dropping,
      setDropping
    }}>
      {children}
    </Context.Provider>
  );
};

const Draggable = ({ i, render }) => {
  const { setDragging, setDropping } = useContext(Context);

  return render({
    draggable: true,
    onDragEnd: () => {
      setDragging(null);
      setDropping({});
    },
    onDragStart: () => setDragging(i)
  });
};

const Droppable = ({ droppable, i, onDrop, render, type }) => {
  const { dragging, dropping, setDropping } = useContext(Context);

  return render({
    dropping: droppable && dropping.i === i && dropping.type === type,
    onDragOver: e => e.preventDefault(),
    onDragEnter: () => setDropping({ i, type }),
    onDrop: () => {
      droppable && dragging !== null && onDrop(dragging, i);
      setDropping({});
    }
  });
};

export default {
  Provider,
  Draggable,
  Droppable
};
