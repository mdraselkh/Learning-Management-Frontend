"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

// SectionList component
const SectionList = ({ items, onReorder, onEdit }) => {
  const [sections, setSections] = useState(items);

  // Sync the local state `sections` with the updated `items` prop when it changes
  useEffect(() => {
    setSections(items); // Update sections if items change
  }, [items]);

  // Handle the end of a drag action
  const onDragEnd = (result) => {
    if (!result.destination) return; // Exit if dropped outside of a droppable area

    // Rearrange items in the UI
    const updatedSections = Array.from(sections);
    const [reorderedItem] = updatedSections.splice(result.source.index, 1);
    updatedSections.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the new order
    setSections(updatedSections);

    // Prepare bulk update data for the backend (id and new position)
    const bulkUpdateData = updatedSections.map((section, index) => ({
      id: section.id,
      position: index, // Set the position to the new index
    }));

    // Call the onReorder handler to update the backend
    onReorder(bulkUpdateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-5 my-7"
          >
            {sections.map((section, index) => (
              <Draggable key={section.id} draggableId={String(section.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center bg-[#FFF8EB] rounded-lg text-sm font-medium p-3"
                  >
                    <div {...provided.dragHandleProps} className="cursor-move">
                      <Grip className="h-4 w-4 mr-4 hover:text-[#FDAB04]" />
                    </div>
                    {section.title}
                    <div className="ml-auto flex items-center gap-3">
                        {section.is_published ? <span className="text-yellow-500 font-semibold font-serif">Published</span> : ''}
                      <Pencil
                        className="h-4 w-4 cursor-pointer hover:text-[#FDAB04]"
                        onClick={() => onEdit(section.id)} // Edit section on click
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* This ensures space for the dragging element */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
