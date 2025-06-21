import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Testimonials = () => (
    <div className="mt-12 mb-16 mx-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Members Say</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { name: "Ayşe Yılmaz", quote: "The trainers are amazing and the classes are so fun!", avatar: "https://placehold.co/40x40?text=AY" },
                { name: "Mehmet Kaya", quote: "I’ve never felt stronger thanks to the HIIT sessions!", avatar: "https://placehold.co/40x40?text=MK" },
                { name: "Elif Demir", quote: "The yoga classes have transformed my daily routine.", avatar: "https://placehold.co/40x40?text=ED" },
            ].map((testimonial, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50">
                    <CardHeader className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg font-semibold text-gray-800">{testimonial.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);