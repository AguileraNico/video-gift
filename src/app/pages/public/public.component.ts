import { Component } from "@angular/core";
import { VideoRecorderComponent } from "src/app/shared/components/video-recorder/video-recorder.component";

@Component({
    selector: 'app-public-section',
    templateUrl: './public.component.html',
    imports: [VideoRecorderComponent],
    standalone: true
})
export class PublicComponent {}