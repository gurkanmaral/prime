import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Trainers = () => (
    <div className="mt-12 mb-16 mx-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Trainers</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { name: "Can Öztürk", specialty: "HIIT & Strength", avatar: "https://placehold.co/40x40?text=CO" },
                { name: "Zeynep Aksoy", specialty: "Yoga & Pilates", avatar: "https://placehold.co/40x40?text=ZA" },
                { name: "Emre Şahin", specialty: "Kickboxing", avatar: "https://placehold.co/40x40?text=ES" },
            ].map((trainer, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50">
                    <CardHeader className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={trainer.avatar} alt={trainer.name} />
                            <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg font-semibold text-gray-800">{trainer.name}</CardTitle>
                            <Badge className="mt-1 bg-gray-600 text-gray-100">{trainer.specialty}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600">Book a Session</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);