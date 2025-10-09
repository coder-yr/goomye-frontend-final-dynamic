import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-foreground space-y-4">
      <p className="leading-relaxed">
        The iMac "M1" 8-Core CPU/8-Core GPU/4 USB-C Shaped Ports (2021) model features a 5-nm
        Apple M1 processor with 8 cores (4 performance cores and 4 efficiency cores), an 8-core GPU, a
        16-core Neural Engine, 8 GB of onboard RAM, and a 1 TB onboard SSD.
      </p>
      
      <p className="leading-relaxed">
        This all is housed in a wafer thin aluminum case with flat edges that includes a 23.5" 4480×2520,
        218 PPI, LED-backlit, "True Tone" widescreen display mounted on a svelte aluminum stand. This
        specific model is offered in the a two-tone Blue color. It also has an integrated 1080p FaceTime
        HD camera, a "studio-quality three-mic array" and a "high-fidelity six-speaker system" that
        supports Spatial Audio with Dolby Atmos.
      </p>

      <p className="leading-relaxed">
        Connectivity includes two Thunderbolt / USB 4 ports and two USB 3 ports (all with a USB-C
        connector), a 3.5 mm headphone jack conveniently mounted on the left edge of the display, Wi-Fi 6 (802.11ax), and Bluetooth 5.0.
      </p>

      <div className={`space-y-4 ${!isExpanded ? 'hidden' : ''}`}>
        <div>
          <h3 className="text-lg font-semibold mb-2">Brilliant 4.5K Retina display:</h3>
          <p className="leading-relaxed">
            see the big picture and all the details! See it all in sharp, glorious
            detail on the immersive 24-inch 4.5K Retina display. The P3 wide color gamut brings what you're
            watching to life in over a billion colors. Images shine with a brilliant 500 nits of brightness.
          </p>
        </div>

        <p className="leading-relaxed">
          A larger sensor that captures more light. And the advanced image signal processor (ISP) of M1
          greatly improves image quality. So from collaborating with coworkers to catching up with friends
          and family over FaceTime, you'll always look your best, and True Tone technology automatically
          adjusts the color temperature of your display to the ambient light of your environment, for a more
          natural viewing experience.
        </p>

        <p className="leading-relaxed">
          So whether you're editing photos, working on presentations, or watching your favorite shows and
          movies, everything looks incredible on iMac.
        </p>

        <p className="leading-relaxed">
          Your iMac comes with 90 days of complimentary technical support and a one-year limited
          warranty. Purchase AppleCare+ for Mac to extend your coverage from your AppleCare+
          purchase date and add unlimited repairs for accidental damage from handling, each subject to a
          service fee of $99 for screen damage or external enclosure damage, or $299 for other repairable
          accidental damage, plus applicable tax.
        </p>

        <p className="leading-relaxed">
          Accessibility features help people with disabilities get the most out of their new iMac. With built-in support for vision, hearing, mobility, and learning, you can create and do amazing and creative
          things.
        </p>
      </div>

      <Button
        variant="link"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary p-0 h-auto font-normal hover:no-underline"
      >
        Show {isExpanded ? 'less' : 'more'}
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 ml-1" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-1" />
        )}
      </Button>
    </div>
  );
};

export default ProductDescription;