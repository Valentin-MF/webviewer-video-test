import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import { WebViewerVideoInstance } from "@pdftron/webviewer-video";
import { initializeVideoViewer } from "@pdftron/webviewer-video/dist/main-with-react";

const webviewerLicense = "---- Insert commercial license key here after purchase ----";
const webviewerVideoLicense = "---- Insert commercial license key here after purchase ----";
const webviewerServerURL = "";
const pdftronPath = "/public/pdftron";
const resourceUrl = "https://pdftron.s3.amazonaws.com/downloads/pl/video/video.mp4";
const fileName = { fileName:"video.mp4" };

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('viewer') viewer: ElementRef;
    wvInstance: WebViewerInstance;

    public ngAfterViewInit(): void {
        WebViewer({
            licenseKey: webviewerLicense,
            webviewerServerURL: webviewerServerURL,
            path: pdftronPath,
            backendType: 'xod',
            enableMeasurement: true,
        }, this.viewer.nativeElement).then((instance: WebViewerInstance) => {
            instance.Core.disableEmbeddedJavaScript();
            this.wvInstance = instance;


            // Video Options for initializing.
            const videoOptions = {
                license: webviewerVideoLicense,
                showAnnotationPreview: false,
                showTooltipPreview: false,
                showSubtitlesButton: false,
                openNotesPanelOnDocumentLoaded: false
            };

            // Initializing video viewer.
            initializeVideoViewer(this.wvInstance, videoOptions)
                .then((videoInstance: WebViewerVideoInstance) => {
                    let webViewerVideoInstance = videoInstance;

                    webViewerVideoInstance.loadVideo(resourceUrl, fileName);
                }).catch((e: any) => {
                    console.error(e);
                });
        }).catch((e: any) => {
            console.error(e);
        });
    }
}