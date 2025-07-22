import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveRouting } from '../enums/active-routing.enum';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ActiveRoutingService {
  activeRoute: ActiveRouting = ActiveRouting.Dashboard;
  activeRouteIcon: string = 'assets/icons/dashboard.svg';

  routes: MenuItem[] = [
    {
      id: ActiveRouting.Dashboard,
      label: 'Dashboard',
      icon: 'assets/icons/dashboard.svg',
      command: () => {
        this.activeRoute = ActiveRouting.Dashboard;
        this.router.navigate(['/dashboard']);
      },
      items: [],
    },
    {
      id: ActiveRouting.Report,
      label: 'Report',
      icon: 'assets/icons/reports.svg',
      command: () => (this.activeRoute = ActiveRouting.Report),
      items: [],
    },
    {
      id: ActiveRouting.Organization,
      label: 'Organization',
      icon: 'assets/icons/organization.svg',
      command: (item: MenuItem) => (item.expanded = !item.expanded),
      items: [
        {
          id: ActiveRouting.Invoice,
          label: 'Invoice',
          icon: 'assets/icons/invoice.svg',
          isChild: true,
          command: () => (this.activeRoute = ActiveRouting.Invoice),
        },
        {
          id: ActiveRouting.Users,
          label: 'Users',
          icon: 'assets/icons/users.svg',
          command: () => (this.activeRoute = ActiveRouting.Users),
          isChild: true,
          action: {
            icon: '../assets/icons/plus.svg',
            link: 'organization/users/add',
          },
        },
      ],
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  setActiveRoute(activeRoute: ActiveRouting) {
    this.activeRoute = activeRoute;
    this.activeRouteIcon =
      this.routes.find((it) => it.id == activeRoute)?.icon ?? '';
    this.expandMatchingItem(activeRoute);
  }

  expandMatchingItem(activeRoute: ActiveRouting) {
    for (let item of this.routes) {
      if (item.items) {
        const match = item.items.find((child) => child.id == activeRoute);
        item.expanded = !!match;
      }
    }
  }
}
