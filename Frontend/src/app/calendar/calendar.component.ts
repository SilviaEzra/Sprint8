import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { environment } from '../environments/environments';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('eventModal') eventModal!: ElementRef;
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {}; // Inicializar con un objeto vacío
  events: any[] = [];

  newEvent = {
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    type: ''
  };

  private bootstrapModal: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this)
    };
  }

  handleDateClick(arg: any) {
    this.newEvent.startDate = arg.dateStr;
    this.newEvent.endDate = arg.dateStr;
    this.openModal();
  }

  handleEventClick(arg: any) {
    if (confirm('Do you want to delete this event?')) {
      this.http.delete(`${environment.endpoint}api/events/${arg.event.id}`).subscribe(
        () => {
          this.loadEvents();
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

  openModal() {
    const modalElement = this.eventModal.nativeElement;
    this.bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
    this.bootstrapModal.show();
  }

  saveEvent() {
    const start = `${this.newEvent.startDate}T${this.newEvent.startTime}:00`;
    const end = `${this.newEvent.endDate}T${this.newEvent.endTime}:00`;

    const eventToSave = {
      title: this.newEvent.title,
      start: start,
      end: end,
      type: this.newEvent.type
    };

    this.http.post(`${environment.endpoint}api/events`, eventToSave).subscribe(
      () => {
        this.loadEvents();
        this.resetForm();  // Reset the form fields
        this.closeModal();
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating event:', error);
      }
    );
  }

  closeModal() {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
  }

  loadEvents() {
    this.http.get<any[]>(`${environment.endpoint}api/events`).subscribe(
      data => {
        this.events = data;
        this.calendarOptions.events = this.events;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  resetForm() {
    this.newEvent = {
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      type: ''
    };
  }
}
