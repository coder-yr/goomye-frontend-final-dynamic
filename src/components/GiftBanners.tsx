import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const GiftBanners = () => {
  const [image, setImage] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>("Gift banner");

  useEffect(() => {
    api.getContent("gifts")
      .then((res) => {
        const items = res && (res.items ?? []);
        if (Array.isArray(items) && items[0]) {
          setImage(items[0].image || null);
          setAlt(items[0].alt || "Gift banner");
        }
      })
      .catch(() => {});
  }, []);

  if (!image) return null;

  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <img
          src={image}
          alt={alt}
          className="w-full h-auto rounded-2xl"
        />
      </div>
    </section>
  );
};

export default GiftBanners;
