export interface AdminCredentials {
    email: string;
    password: string;
}

export interface TourData {
    title: string;
    description: string;
    price: string;
    destination: string;
    available_slots: string;
}

export interface BookingData {
    customer_name: string;
    tour_name: string;
    booking_date: string;
    status: string;
}

export interface TicketData {
    booking_reference: string;
    customer_name: string;
    tour_name: string;
    travel_date: string;
}
