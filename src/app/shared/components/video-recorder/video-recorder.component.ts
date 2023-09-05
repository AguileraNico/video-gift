import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-video-recorder',
	templateUrl: './video-recorder.component.html',
	styleUrls: ['./video-recorder.component.scss'],
    imports: [NgIf],
	standalone: true,
})
export class VideoRecorderComponent implements OnInit {
	@ViewChild('videoElement')
	videoElement!: ElementRef;
	mediaStream!: MediaStream | null;
	newMediaStream: SafeUrl | undefined;
    recorded = false;
    blob!: Blob;
    storage = inject(Storage);
	private mediaRecorder!: MediaRecorder;
	private recordedChunks: Blob[] = [];

	constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.initializeMedia();
    }

	initializeMedia(): void {
		navigator.mediaDevices.getUserMedia({
			video: true,
		}).then(media => {
            this.mediaStream = media;
            this.videoElement.nativeElement.srcObject = this.mediaStream;
            this.mediaRecorder = new MediaRecorder(this.mediaStream);
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            this.mediaRecorder.onstop = () => {
                this.blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                this.newMediaStream = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.blob));
                this.recordedChunks = [];
            };
        });
	}

	startRecording() {
		try {
            if (this.mediaStream) {
                this.recorded = false;
                this.mediaRecorder.start();
            }
		} catch (error) {
			console.error('Error al acceder a la cámara:', error);
		}
	}

	stopRecording() {
		if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
			this.mediaRecorder.stop();
            setTimeout(() => {
                this.recorded = true;
                console.log(this.newMediaStream)
            }, 5000)
		}
	}

    uploadRecording() {
        // const storageRef = ref(this.storage, 'some-child');
        // uploadBytes(storageRef, this.blob).then((snapshot) => {
        //     console.log('Uploaded a blob or file!', snapshot);
        //   });
    }
}
