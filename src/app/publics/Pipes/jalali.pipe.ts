import {  Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment'; 
 @Pipe ({
  name: 'jalaliPipe'
})

export  class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let MomentDate = moment(value, 'YYYY/MM/DD');
    // console.log(MomentDate);
    return MomentDate.locale('fa').format('YYYY/MM/DD');
  }
}