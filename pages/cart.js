import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
  const { cart, setCart } = useCart()

  const handleDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(cart)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setCart(items)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cart">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cart.map((item, index) => (
                <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white dark:bg-gray-800 p-4 mb-4 rounded shadow"
                    >
                      <h3 className="font-bold">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p>Quantity: {item.quantity}</p>
                          <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}