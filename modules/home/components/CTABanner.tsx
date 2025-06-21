import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const CTABanner = () => (
    <Alert className="mt-12 mb-16 mx-4 bg-gradient-to-r from-gray-800 to-gray-600 text-gray-100 border-none rounded-lg p-8 max-w-6xl mx-auto">
        <AlertTitle className="text-2xl font-bold">Ready to Transform Your Life?</AlertTitle>
        <AlertDescription className="text-lg mt-2">
            Join our gym today and get a free 7-day trial! Start your fitness journey with expert trainers and state-of-the-art facilities.
        </AlertDescription>
        <Button className="mt-4 bg-gray-700 text-gray-100 hover:bg-gray-600">Join Now</Button>
    </Alert>
);