interface OrderItemProps {
	image: string;
	name: string;
	size: string;
	color: string;
	price: number;
	quantity: number;
	deliveryDate: string;
}

const OrderItem = ({ image, name, size, color, price, quantity, deliveryDate }: OrderItemProps) => {
	return (
		<div className="flex gap-4 py-6 border-b border-border last:border-b-0">
			<div className="flex-shrink-0">
				<img 
					src={image} 
					alt={name}
					className="w-32 h-32 object-cover rounded-lg bg-muted"
				/>
			</div>
			<div className="flex-1 grid grid-cols-3 gap-8">
				<div>
					<p className="text-sm text-muted-foreground mb-1">Item</p>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-muted-foreground mt-3">Color</p>
					<p className="text-sm">{color}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground mb-1">Size</p>
					<p className="font-medium">{size}</p>
					<p className="text-sm text-muted-foreground mt-3">Price</p>
					<p className="text-sm font-medium">${price}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground mb-1">Quantity</p>
					<p className="font-medium">{quantity}</p>
					<p className="text-sm text-muted-foreground mt-3">Expected delivery date</p>
					<p className="text-sm">{deliveryDate}</p>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
