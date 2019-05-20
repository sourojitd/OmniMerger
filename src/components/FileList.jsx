import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FileText, Image as ImageIcon, X, GripVertical } from 'lucide-react';

const SortableItem = ({ id, file, onRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.8 : 1,
        scale: isDragging ? 1.02 : 1,
    };

    const getIcon = (type) => {
        if (type.includes('pdf')) return <FileText size={24} color="#f87171" />;
        if (type.includes('image')) return <ImageIcon size={24} color="#60a5fa" />;
        if (type.includes('word') || type.includes('docx') || type.includes('officedocument')) return <FileText size={24} color="#2563eb" />;
        return <FileText size={24} />;
    };

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 1.5rem',
                marginBottom: '0.8rem',
                background: isDragging ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                userSelect: 'none',
                backdropFilter: 'blur(10px)',
                boxShadow: isDragging
                    ? '0 10px 30px rgba(0,0,0,0.2)'
                    : '0 4px 6px rgba(0,0,0,0.05)',
                animation: 'slideIn 0.3s ease-out',
                transition: 'all 0.2s ease',
            }}
            className="file-item"
        >
            <div
                {...attributes}
                {...listeners}
                style={{
                    cursor: 'grab',
                    marginRight: '1rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    borderRadius: '8px',
                }}
                className="drag-handle"
            >
                <GripVertical size={20} />
            </div>

            <div style={{
                marginRight: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.8rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {getIcon(file.type)}
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <p style={{
                    margin: '0 0 0.3rem 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 500,
                    fontSize: '1.05rem',
                    color: 'var(--text-primary)',
                }}>
                    {file.name}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
            </div>

            <button
                onClick={() => onRemove(id)}
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.6rem',
                    color: 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: 'none',
                }}
                className="remove-btn"
            >
                <X size={18} />
            </button>

            <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .file-item:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        .drag-handle:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }
        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          color: #f87171 !important;
        }
      `}</style>
        </div>
    );
};

const FileList = ({ files, setFiles, onClearAll }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setFiles((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    if (files.length === 0) return null;

    return (
        <div style={{ width: '100%' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                padding: '0 0.5rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h4 style={{
                        margin: 0,
                        color: 'var(--text-secondary)',
                        fontSize: '1.1rem',
                        fontWeight: 500
                    }}>
                        Files to Merge
                    </h4>
                    <span style={{
                        background: 'rgba(99, 102, 241, 0.2)',
                        color: '#a5b4fc',
                        padding: '0.2rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>
                        {files.length}
                    </span>
                </div>

                <button
                    onClick={onClearAll}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        boxShadow: 'none',
                    }}
                    className="clear-all-btn"
                >
                    Clear All
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={files.map(f => f.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {files.map((file) => (
                        <SortableItem
                            key={file.id}
                            id={file.id}
                            file={file.file}
                            onRemove={(id) => setFiles(files.filter(f => f.id !== id))}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <style>{`
        .clear-all-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          border-color: #f87171 !important;
          transform: translateY(-1px);
        }
      `}</style>
        </div>
    );
};

export default FileList;
