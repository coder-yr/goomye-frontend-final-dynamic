import giftCardsImage from "@/assets/gift-cards.png";

const GiftBanners = () => {
  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <img
          src={giftCardsImage}
          alt="Croma gift cards - E-Gift Card and Indulge premium appliances"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    </section>
  );
};

export default GiftBanners;
