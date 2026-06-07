<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CourseController extends Controller
{
    private Course $course;

    public function __construct(Course $course)
    {
        $this->course = $course;
    }

    /**
     * List courses with optional search by title.
     */
    public function index(Request $request): JsonResponse
    {
        $courses = $this->course->newQuery()
            ->when($request->has('search'), function ($query) use ($request) {
                $query->where('title', 'like', "%{$request->search}%");
            })
            ->orderBy('id', 'asc')
            ->paginate(10);

        return response()->json($courses, Response::HTTP_OK);
    }

    /**
     * Store a new course.
     */
    public function store(CourseRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Handle primary image upload
        if ($request->hasFile('primary_image')) {
            $path = $request->file('primary_image')->store('courses', 'public');
            $data['primary_image'] = url('storage/' . $path);
        }
        // Handle secondary image upload (optional)
        if ($request->hasFile('secondary_image')) {
            $path = $request->file('secondary_image')->store('courses', 'public');
            $data['secondary_image'] = url('storage/' . $path);
        }

        $course = Course::create($data);
        return response()->json($course, Response::HTTP_CREATED);
    }

    /**
     * Show a specific course.
     */
    public function show(string $id): JsonResponse
    {
        $course = $this->course->findOrFail($id);
        return response()->json($course, Response::HTTP_OK);
    }

    /**
     * Update an existing course.
     */
    public function update(CourseRequest $request, string $id): JsonResponse
    {
        $course = $this->course->findOrFail($id);
        $data = $request->validated();

        // Primary image replacement
        if ($request->hasFile('primary_image')) {
            try {
                if ($course->primary_image) {
                    $old = explode('courses/', $course->primary_image);
                    Storage::disk('public')->delete('courses/' . $old[1]);
                }
            } catch (Throwable) {}
            finally {
                $path = $request->file('primary_image')->store('courses', 'public');
                $data['primary_image'] = url('storage/' . $path);
            }
        }

        // Secondary image replacement
        if ($request->hasFile('secondary_image')) {
            try {
                if ($course->secondary_image) {
                    $old = explode('courses/', $course->secondary_image);
                    Storage::disk('public')->delete('courses/' . $old[1]);
                }
            } catch (Throwable) {}
            finally {
                $path = $request->file('secondary_image')->store('courses', 'public');
                $data['secondary_image'] = url('storage/' . $path);
            }
        }

        $course->update($data);
        return response()->json($course, Response::HTTP_OK);
    }

    /**
     * Delete a course and its associated images.
     */
    public function destroy(string $id): JsonResponse
    {
        $course = $this->course->findOrFail($id);
        // Delete stored images if they exist
        if ($course->primary_image) {
            $part = explode('courses/', $course->primary_image);
            Storage::disk('public')->delete('courses/' . $part[1]);
        }
        if ($course->secondary_image) {
            $part = explode('courses/', $course->secondary_image);
            Storage::disk('public')->delete('courses/' . $part[1]);
        }
        $course->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
?>
