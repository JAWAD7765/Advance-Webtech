import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';
import { NotificationService } from '../notification/notification.service.js';

@Injectable()
export class EnrollmentService {
  constructor(
    private courseService: CourseService, // Eta thik thakbe
    @Inject(forwardRef(() => NotificationService))
    private notificationService: any, // <-- Ekhane 'NotificationService' er bodole 'any' likhte hobe
  ) {}

  getEnrollments() {
    return { message: 'All enrollments fetched', data: [] };
  }

  enrollStudent(studentName: string, courseId: string) {
    const course = this.courseService.getCourseById(courseId);
    
    const enrollment = {
      message: 'Student enrolled successfully',
      student: studentName,
      course: course,
    };
    
    const notification = this.notificationService.sendNotification(
      studentName,
      'Enrollment successful',
    );
    
    return { ...enrollment, notification: notification };
  }
}