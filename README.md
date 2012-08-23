# jQuery Throttle

A simple event throttler for jQuery. Best illustrated with an example from a real life example of a shopping cart. This is the plus/add button:

    product.find('.add').throttle({
		
		// The initial state, we will add one product
        state: { qty: 1 },
		
		// If the user clicks add quickly the quantity in the state is updated
        update: function (event, state) {
            state.qty += 1;
            return state;
        }

		// The actual work, posting to the server that the user wants
		// to add qty number of products to the basket
        action: function (event, state) {
			
			$.post(
				'/basket',
				{
					id: product.attr('id'),
					qty: state.qty
				}
            );
			
			// Return the state to 1 product
            return { qty: 1 };
        },
		
		// If the user doesn't click again within 200ms we call the server
        timeout: 200,
		
		// However we cannot stall forever, so after 400ms the callback is invoked
        max: 400,
		
    });

Basically this peice of codes adds an onclick handler that will register each click and update the quantity, but only calls up the server if the user stops clicking or after 400ms.

## Options

action: The callback you would normally attach to the element.  
init: An optional callback that is invoked every first event on the element.  
reset: An optional callback that is invoked on every event.  
update: An optional callback that is invoked when the event is throtteled.  

timeout: The delay before invoking the action callback. Events are throtteled within this time. **Default: 200ms**  
max: The max time to throttle the event. **Default: 400ms**  
event: The event to throttle. **Default: click**, but basically you can throttle any event.
state: An object that is passed to each of the above methods.  

If you want to maintain the state return it in each function: action, init, reset, update. If you don't the state will remain the same.