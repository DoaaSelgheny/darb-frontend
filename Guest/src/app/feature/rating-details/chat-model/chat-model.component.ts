import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReviewDto } from '@proxy/ratings';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-chat-model',
  standalone: true,
  imports: [UiComponentsModule,CommonModule],
  templateUrl: './chat-model.component.html',
  styleUrl: './chat-model.component.scss'
})
export class ChatModelComponent {
@Input() review :ReviewDto;
@Input() isHost:boolean=false;
}
