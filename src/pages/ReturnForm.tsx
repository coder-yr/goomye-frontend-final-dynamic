import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { StepIndicator } from "../components/StepIndicator";
import { ProductSelection } from "../components/steps/ProductSelection";
import { ReturnReason } from "../components/steps/ReturnReason";
import { DeliveryOption } from "../components/steps/DeliveryOption";
import { RefundChoice } from "../components/steps/RefundChoice";
import { Confirmation } from "../components/steps/Confirmation";
import { fetchReturnProducts, submitReturnRequest } from "../lib/returnApi";
import { ReturnCondition, ReturnReason as ReturnReasonType, DeliveryMethod, RefundOption } from "../types/return";

export const ReturnForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [condition, setCondition] = useState<keyof ReturnCondition>("mistaken");
    const [reasons, setReasons] = useState<(keyof ReturnReasonType)[]>([]);
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod['type']>("express");
    const [refundOption, setRefundOption] = useState<RefundOption['type']>("product");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Fetch all orders for the current user, flatten products
        fetchReturnProducts()
            .then((data) => {
                // If backend returns all products ordered by current user, use directly
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load products");
                setLoading(false);
            });
    }, []);

    const handleToggleProduct = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const handleReasonToggle = (reason: keyof ReturnReasonType) => {
        setReasons((prev) =>
            prev.includes(reason)
                ? prev.filter((r) => r !== reason)
                : [...prev, reason]
        );
    };

    const handleNext = () => {
        if (currentStep === 4) {
            setLoading(true);
            submitReturnRequest({
                selectedProducts,
                condition,
                reasons,
                deliveryMethod,
                refundOption,
            })
                .then((response) => {
                    // Store the product/order ID for status redirect
                    let orderId = null;
                    if (response && response.orderId) {
                        orderId = response.orderId;
                    } else if (selectedProducts.length > 0) {
                        // Try to get orderNumber from selected product
                        const selectedProductObj = products.find((p: any) => p.id === selectedProducts[0]);
                        orderId = selectedProductObj?.orderNumber || selectedProducts[0];
                    }
                    if (orderId) {
                        localStorage.setItem("lastReturnOrderId", orderId);
                    }
                    setSubmitted(true);
                    setCurrentStep((prev) => Math.min(prev + 1, 5));
                })
                .catch(() => {
                    setError("Failed to submit return request");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const steps = [
        { label: "Product Selection", completed: currentStep > 1, active: currentStep === 1 },
        { label: "Return Reason", completed: currentStep > 2, active: currentStep === 2 },
        { label: "Delivery Option", completed: currentStep > 3, active: currentStep === 3 },
        { label: "Refund Choice", completed: currentStep > 4, active: currentStep === 4 },
        { label: "Confirmation", completed: currentStep > 5, active: currentStep === 5 },
    ];

    const getNextButtonText = () => {
        switch (currentStep) {
            case 1:
                return "Next: Return reason";
            case 2:
                return "Next: Delivery method";
            case 3:
                return "Next: Return option";
            case 4:
                return submitted ? "Submitted" : "Next: Confirmation";
            default:
                return "Next";
        }
    };

    const getPrevButtonText = () => {
        switch (currentStep) {
            case 2:
                return "Prev: Choose the product";
            case 3:
                return "Prev: Return reason";
            case 4:
                return "Prev: Delivery";
            default:
                return "Prev";
        }
    };

    const selectedProduct = products.find((p: any) => selectedProducts.includes(p.id));

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Product return form</h1>
                <StepIndicator steps={steps} />
                {loading && <div className="mb-4 text-center text-muted-foreground">Loading...</div>}
                {error && <div className="mb-4 text-center text-destructive">{error}</div>}
                <div className="mb-8">
                    {currentStep === 1 && (
                        <ProductSelection
                            products={products}
                            selectedProducts={selectedProducts}
                            onToggleProduct={handleToggleProduct}
                        />
                    )}
                    {currentStep === 2 && selectedProduct && (
                        <ReturnReason
                            selectedProduct={selectedProduct}
                            condition={condition}
                            reasons={reasons}
                            onConditionChange={setCondition}
                            onReasonToggle={handleReasonToggle}
                        />
                    )}
                    {currentStep === 3 && (
                        <DeliveryOption
                            selectedMethod={deliveryMethod}
                            onMethodChange={setDeliveryMethod}
                        />
                    )}
                    {currentStep === 4 && (
                        <RefundChoice
                            selectedOption={refundOption}
                            onOptionChange={setRefundOption}
                        />
                    )}
                    {currentStep === 5 && <Confirmation />}
                </div>
                {currentStep < 5 && (
                    <div className="flex gap-3 flex-wrap">
                        {currentStep === 1 ? (
                            <Button variant="outline" className="hover:bg-secondary transition-all">
                                Cancel
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={handlePrev}
                                className="hover:bg-secondary transition-all"
                            >
                                {getPrevButtonText()}
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            className="bg-primary hover:bg-accent text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
                            disabled={loading || (currentStep === 4 && submitted)}
                        >
                            {getNextButtonText()}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReturnForm;
