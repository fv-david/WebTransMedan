import { Connection } from '../connection/connection.model';

export interface Ticket {
    id?: number;
    connection: Connection;
    price: number;
    reservationDate: string;
    ticketNumber: string;
}
