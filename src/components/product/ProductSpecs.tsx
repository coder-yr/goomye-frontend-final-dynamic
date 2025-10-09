const ProductSpecs = () => {
  const specs = [
    {
      title: "Display",
      items: [
        { label: "Screen Type", value: "light" },
        { label: "Diagonal", value: "24 inches" },
        { label: "Resolution", value: "4480 x 2520" },
        { label: "Format", value: "4x" },
      ],
    },
    {
      title: "Processor",
      items: [
        { label: "Processor Type", value: "Apple M3" },
        { label: "Model", value: "M3" },
        { label: "Physical cores", value: "8" },
        { label: "Virtual Cores", value: "16" },
        { label: "Technology", value: "3nm" },
      ],
    },
    {
      title: "RAM memory",
      items: [
        { label: "Capacity", value: "8GB" },
        { label: "Maximum memory", value: "64GB" },
      ],
    },
    {
      title: "Storage",
      items: [
        { label: "Capacity", value: "512GB" },
      ],
    },
  ];

  return (
    <>
      {specs.map((section, idx) => (
        <div key={idx} className="border border-border rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex justify-between items-start text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSpecs;