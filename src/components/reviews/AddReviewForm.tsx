import { useState } from "react";
import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";

export const AddReviewForm = () => {
  const [rating, setRating] = useState(3);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recommend, setRecommend] = useState<string>("no");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    toast.success("Review submitted successfully!");
    handleReset();
  };

  const handleReset = () => {
    setRating(3);
    setTitle("");
    setDescription("");
    setRecommend("no");
    setAcceptTerms(false);
    setImages([]);
  };

  return (
    <div className="border rounded-lg p-6 bg-card">
      <h2 className="text-2xl font-bold mb-6">Add a review</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <StarRating 
            rating={rating} 
            onRatingChange={setRating} 
            interactive 
            size="lg"
            showLabel
          />
        </div>

        <div>
          <Label htmlFor="title" className="text-base font-semibold mb-2 block">
            Review title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-base font-semibold mb-2 block">
            Review description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[150px]"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Problems with the product or delivery?{" "}
            <a href="#" className="text-[hsl(var(--verified))] hover:underline">
              Send a report
            </a>
            .
          </p>
        </div>

        <div>
          <Label className="text-base font-semibold mb-2 block">
            Add real photos of the product to help other customers{" "}
            <span className="text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="images" className="cursor-pointer">
              <CloudUpload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-1">
                <span className="text-primary font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-muted-foreground">
                SVG, PNG, JPG or GIF (MAX. 800×400px)
              </p>
            </label>
          </div>
          {images.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {images.length} file(s) selected
            </p>
          )}
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">
            Do you recommend this product?
          </Label>
          <RadioGroup value={recommend} onValueChange={setRecommend}>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="cursor-pointer font-normal">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="cursor-pointer font-normal">
                  No
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="cursor-pointer font-normal">
            By publishing this review you agree with the{" "}
            <a href="#" className="text-[hsl(var(--verified))] hover:underline">
              terms and conditions
            </a>
            .
          </Label>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Submit review
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};



