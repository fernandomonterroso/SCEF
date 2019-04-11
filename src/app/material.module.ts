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
    MatToolbarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatCheckboxModule,

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
        MatToolbarModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatCheckboxModule,
     
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
        MatToolbarModule,
        MatTooltipModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatCheckboxModule,
        
    ]
})

export class MetarialModule {}