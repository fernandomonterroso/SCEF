import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatStepperModule





} from '@angular/material'

@NgModule({
    imports:[
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatStepperModule
    ],
    exports:[
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatStepperModule
    ]
})

export class MetarialModule {}