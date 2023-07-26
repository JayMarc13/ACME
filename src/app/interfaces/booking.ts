export interface Booking{
    MeetingRoomId: number,
    ReserveDate: Date,
    StartTime: string,
    EndTime: string,
    UserId: number,
    MeetingRoomName?: string
}