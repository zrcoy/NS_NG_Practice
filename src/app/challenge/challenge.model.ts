import { Day, DayStatus } from "./day.model";

export class Challenge {
  constructor(
    public title: string,
    public description: string,
    public year: number,
    public month: number,
    private _days: Day[] = []
  ) {
    //If alreay there're days with challenges loaded, there's no need to construct
    if (_days.length > 0) {
      return;
    }

    // this._currentMonth = new Date().getMonth();
    // this._currentYear = new Date().getFullYear();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(year, month, i);
      const day = date.getDay();
      _days.push({
        dayInMonth: i,
        dayInWeek: day,
        date: date,
        status: DayStatus.Open
      });
    }
  }

  get currentDay() {
    return this._days.find(d => d.dayInMonth === new Date().getDate());
  }

  get days() {
    return [...this._days];
  }
}
