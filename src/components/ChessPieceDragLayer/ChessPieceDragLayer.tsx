import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

import ChessPieceDragPreview from './ChessPieceDragPreview';
import useStyles from './styles';

function getLayerStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }
  const { x, y } = currentOffset;
  // Use 3d translate for hardware acceleration
  return { transform: `translate3d(${x}px, ${y}px, 0)` };
}

const ChessPieceDragLayer: React.FC = () => {
  // DragItemLayer data of `react-dnd` API.
  const { item, initialOffset, currentOffset, isDragging } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  // Render only while dragging.
  return !isDragging ? null : (
    <div className={classes.dragLayer}>
      <div
        className={classes.dragObject}
        style={getLayerStyles(initialOffset, currentOffset)}
      >
        <ChessPieceDragPreview
          color={item.color}
          variant={item.variant}
          size={item.size}
        />
      </div>
    </div>
  );
};

export default ChessPieceDragLayer;
