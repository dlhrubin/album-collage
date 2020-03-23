import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Item = ({ selection, deleteAlbum, drop }) => {
  const [{ opacity }, connectDrag] = useDrag({
    item: { id: selection.id, type: 'ITEM', text: `${selection.album} (${selection.artist})` },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, connectDrop] = useDrop({
    accept: 'ITEM',
    hover(item) {
      if (item.id !== selection.id) {
        drop(selection.id, item.id);
      }
    },
  });

  return (
    connectDrag(
      connectDrop(
        <div className="selection" style={{ opacity }}>
          <img src={selection.thumbnail} alt={`${selection.album}, ${selection.artist}`} draggable="false" />
          <div className="title-container">
            <span>{selection.id}</span>
          </div>
          <button type="button" aria-label="Delete Selection" onClick={() => deleteAlbum(selection.artist, selection.album)}>
            <i className="fas fa-times" />
          </button>
        </div>,
      ),
    )
  );
};

export default Item;
