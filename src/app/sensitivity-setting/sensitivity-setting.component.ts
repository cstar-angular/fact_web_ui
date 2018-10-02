import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { CategoriesService } from '../services/categories/categories.service';
import { SourcesService } from '../services/Sources/sources.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sensitivity-setting',
  templateUrl: './sensitivity-setting.component.html',
  styleUrls: ['./sensitivity-setting.component.css']
})
export class SensitivitySettingComponent implements OnInit, AfterViewInit
{

  // @ViewChildren('cont') cont: ElementRef;
  // Test array
  protected categories: Array<any> = [];
  protected sources: Array<any> = [];

  // Change booleans
  categoriesHasChanges = false;
  topicsHasChanges = false;
  isMobile = false;

  constructor(
    private _categoriesService: CategoriesService,
    private _sourcesService: SourcesService)
  {
  }

  ngOnInit()
  {
    this._categoriesService.getUserCategory()
      .subscribe((data: any) =>
      {
        this.categories = data.user_categories;
        console.log(this.categories);
        setTimeout(() => this.setResize(), 0);
    });

    this._sourcesService.getUserSources()
          .subscribe((sources: any) =>
          {
            this.sources = sources.user_sources;
            console.log(this.sources);
            setTimeout(() => this.setResize(), 0);
          });

    this.isMobile = window.innerWidth < 992;
  }

  ngAfterViewInit()
  {

    // debugger;
  }

  private setResize(): void
  {
    let startingHeight;
    let other;
    let sibTotalHeight,
      sibTotalWidth,
      container;
    const windowWidth = window.innerWidth;
    const resizableHandles = windowWidth > 992 ? 's' : 'e';
    
    $('.resiz').resizable({
      containment: 'parent',
      handles: resizableHandles,   /* try using "n" to see what happens... */
      start: function (e, ui)
      {
        if (windowWidth > 992)
        {
          sibTotalHeight = ui.originalSize.height + ui.originalElement.next().outerHeight();
        } else
        {
          sibTotalWidth = ui.originalSize.width + ui.originalElement.next().outerWidth();
        }
        container = $(ui.element).parent();
      },
      resize: function (e, ui)
      {
        if (windowWidth > 992)
        {
          const cellPercentHeight = 100 * ui.originalElement.outerHeight() / container.innerHeight();
          ui.originalElement.attr('data-height', cellPercentHeight);
          const element: HTMLElement = container.siblings('.progressSubmitButton').get(0) as HTMLElement;
          element.click();
        } else
        {
          const cellPercentWidth = 100 * ui.originalElement.outerWidth() / container.innerWidth();
          ui.originalElement.attr('data-height', cellPercentWidth);
          const element: HTMLElement = container.siblings('.progressSubmitButton').get(0) as HTMLElement;
          element.click();
        }
      }
    });
  }
  public catProgressBoxChange = (id) =>
  {
    const currentCellHeight = parseInt($(`#${id}`).attr('data-height'), 10);
    for (let i = 0; i < this.categories.length; i++)
    {
      if (this.categories[i] && this.categories[i].id == id)
      {
        this.categories[i].sensitivity_percents = currentCellHeight;
      }
    }
    this.categoriesHasChanges = true;
  }

  public sourceProgressBoxChange(id)
  {
    const currentCellHeight = parseInt($(`#${id}`).attr('data-height'), 10);
    for (let i = 0; i < this.categories.length; i++)
    {
      if (this.sources[i] && this.sources[i].id == id)
      {
        this.sources[i].sensitivity_percents = currentCellHeight;
      }
    }
    this.topicsHasChanges = true;
  }

  public categoriesSubmitClick()
  {
    this._categoriesService.updateUserCategories({ user_categories: this.categories }).subscribe(res => console.log(res));
    this.categoriesHasChanges = false;
  }

  public topicsSubmitClick()
  {
    console.log(this.sources);
    this._sourcesService.updateUserSources({ user_sources: this.sources }).subscribe(res => console.log(res));
    this.topicsHasChanges = false;
  }
}
