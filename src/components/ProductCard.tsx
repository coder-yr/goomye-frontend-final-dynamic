import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { addToWishlist, removeFromWishlist } from "@/lib/user";
import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
	image: string;
	title: string;
	price: number;
	originalPrice: number;
	rating: number;
	alt: string;
	id?: string | number;
}

import { getSafeImageUrl } from "@/lib/imageUtils";

const ProductCard = ({ image, title, price, originalPrice, rating, alt, id }: ProductCardProps) => {
	const safePrice = Number(price ?? 0);
	const safeOriginal = Number(originalPrice ?? price ?? 0);
	const safeTitle = title ?? "";
	const safeAlt = (alt ?? safeTitle) || "Product image";
	const safeImage = getSafeImageUrl(image);

	const [added, setAdded] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const handleHeartClick = async () => {
		if (!id || loading) return;
		setLoading(true);
		try {
			await addToWishlist({ id, name: safeTitle, image: safeImage, price: safePrice });
			setAdded(true);
			// Optionally show a toast/notification here
		} catch {
			// ignore
		} finally {
			setLoading(false);
		}
	};

	const handleCardClick = (e: React.MouseEvent) => {
		if (id) {
			// Allow the Link navigation to happen
		} else {
			e.preventDefault();
		}
	};

	return (
		<div className="product-card-container">
			<Card 
				className="group overflow-hidden border-0 shadow-none bg-muted/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
				onClick={handleCardClick}
			>
				<Link to={id ? `/product/${id}` : '#'} className="block">
					<div className="relative aspect-square bg-background overflow-hidden">
						<img
							src={safeImage}
							alt={safeAlt}
							className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
							onError={(e) => {
								const target = e.currentTarget;
								if (target.src !== '/placeholder.svg') {
									target.src = '/placeholder.svg';
								}
							}}
						/>
						<Button
							size="icon"
							variant={added ? "default" : "ghost"}
							className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 hover:bg-background z-10"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								handleHeartClick();
							}}
							disabled={added || loading}
						>
							<Heart className={`w-5 h-5 ${added ? "text-red-500" : "text-primary"}`} />
						</Button>
					</div>
					<div className="p-4 space-y-3">
						<h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
							{safeTitle}
						</h3>
						<div className="flex items-center gap-2">
							<span className="text-xl font-bold">₹{safePrice.toLocaleString('en-IN')}</span>
							<span className="text-sm text-muted-foreground line-through">
								₹{safeOriginal.toLocaleString('en-IN')}
							</span>
						</div>
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`h-4 w-4 ${
										i < (rating ?? 0)
											? 'fill-primary text-primary'
											: 'fill-muted text-muted'
									}`}
								/>
							))}
						</div>
					</div>
				</Link>
			</Card>
		</div>
	);
};

export default ProductCard;
