<script lang="ts">
  // Import necessary dependencies
  import { browser } from '$app/environment'; // For checking if code is running in browser
  import { convertTo24Hour, findConflicts } from '$lib'; // Utility functions
  import { Calendar } from '@fullcalendar/core'; // FullCalendar main component
  import dayGridPlugin from '@fullcalendar/daygrid'; // For month/week grid view
  import timeGridPlugin from '@fullcalendar/timegrid'; // For detailed time grid view

  interface Subject {
    id: string;
    day: string;
    name: string;
    room: string;
    endTime: string;
    startTime: string;
  }

  interface Props {
    subjects: Subject[];
  }

  let { subjects }: Props = $props();

  // Calendar instance and DOM element references
  let calendar: Calendar;
  let calendarEl: HTMLElement;

  // Function to transform subject schedules into FullCalendar event format
  const transformSchedulesToEvents = (subjects: Subject[]) => {
    const events = [];
    const daysMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };

    // Helper function to check if two time ranges overlap
    const isTimeOverlap = (subject1: Subject, subject2: Subject) => {
      const start1 = convertTo24Hour(subject1.startTime);
      const end1 = convertTo24Hour(subject1.endTime);
      const start2 = convertTo24Hour(subject2.startTime);
      const end2 = convertTo24Hour(subject2.endTime);
      return start1 < end2 && start2 < end1;
    };

    // Helper function to check if a subject has conflicts
    const hasConflictingSchedule = (currentSubject: Subject) => {
      return subjects.some(
        (otherSubject) =>
          currentSubject.id !== otherSubject.id && // Don't compare with self
          currentSubject.day === otherSubject.day && // Same day
          isTimeOverlap(currentSubject, otherSubject) // Overlapping time
      );
    };

    for (const subject of subjects) {
      const isConflicting = hasConflictingSchedule(subject);

      events.push({
        title: `${subject.name} (${subject.room})`,
        startTime: convertTo24Hour(subject.startTime),
        endTime: convertTo24Hour(subject.endTime),
        daysOfWeek: [daysMap[subject.day]],
        backgroundColor: isConflicting
          ? 'hsl(var(--destructive))'
          : generatePastelColor(subject.id),
        borderColor: isConflicting ? 'hsl(var(--destructive))' : generatePastelColor(subject.id),
        textColor: isConflicting ? 'hsl(var(--destructive-foreground))' : '#000000',
        extendedProps: {
          room: subject.room,
          isConflicting
        }
      });
    }
    return events;
  };

  // Generate consistent pastel colors based on subject ID
  const generatePastelColor = (seed: string) => {
    // Hash the input string to generate a consistent number
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Convert hash to HSL color (pastel)
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  // Initialize and configure the FullCalendar instance
  const renderCalendar = () => {
    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      initialDate: new Date(),
      nowIndicator: true,
      slotMinTime: '06:00:00',
      slotMaxTime: '22:00:00',
      events: transformSchedulesToEvents(subjects || []),
      height: 'auto',
      allDayText: '',
      slotDuration: '00:15:00',
      slotLabelInterval: '00:15:00',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
        hour12: true
      },
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      eventBackgroundColor: 'hsl(var(--primary))',
      eventBorderColor: 'hsl(var(--border))',
      eventTextColor: 'hsl(var(--primary-foreground))',
      buttonIcons: false,
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      bootstrapFontAwesome: false,
      themeSystem: 'standard',
      eventDidMount: (info) => {
        if (info.event.extendedProps.isConflicting) {
          const element = info.el;
          element.style.backgroundColor = 'hsl(var(--destructive))';
          element.style.borderColor = 'hsl(var(--destructive))';
          element.style.color = 'hsl(var(--destructive-foreground))';
        }
      }
    });
  };

  // Lifecycle effect to handle calendar initialization and cleanup
  $effect(() => {
    if (browser) {
      renderCalendar();
      calendar.render();
    }

    // Cleanup function to destroy calendar when component unmounts
    return () => {
      calendar.destroy();
    };
  });

  // Reactive declaration to compute schedule conflicts
  const conflicts = $derived(findConflicts(subjects || []));
</script>

<!-- Display conflict warnings if any conflicts exist -->
{#if conflicts.length > 0}
  <div class="rounded-md border border-destructive bg-destructive/10 p-4">
    <h3 class="mb-2 font-semibold text-destructive">Schedule Conflicts Detected:</h3>
    <ul class="list-disc pl-5">
      {#each conflicts as conflict}
        <li class="text-sm text-destructive">
          Conflict between "{conflict.subject1}" and "{conflict.subject2}" on {conflict.day} at {conflict.time}
        </li>
      {/each}
    </ul>
  </div>
{/if}

<!-- Calendar container element -->
<div bind:this={calendarEl} class="w-full bg-background p-2"></div>

<style>
  :global(.fc) {
    --fc-border-color: hsl(var(--border));
    --fc-button-text-color: hsl(var(--foreground));
    --fc-button-bg-color: hsl(var(--background));
    --fc-button-border-color: hsl(var(--border));
    --fc-button-hover-bg-color: hsl(var(--accent));
    --fc-button-hover-border-color: hsl(var(--border));
    --fc-button-active-bg-color: hsl(var(--accent));
    --fc-button-active-border-color: hsl(var(--border));
    --fc-today-bg-color: hsl(var(--accent) / 0.5);
    --fc-neutral-bg-color: hsl(var(--background));
    --fc-list-event-hover-bg-color: hsl(var(--accent));
    --fc-page-bg-color: hsl(var(--background));
  }
</style>
