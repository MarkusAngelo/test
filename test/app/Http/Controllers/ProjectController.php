<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::all();
    }

    public function store(Request $request)
    {
        try {
            $project = new Project();
            $project->title = $request->title;
            $project->startDate = $request->startDate;
            $project->endDate = $request->endDate;
            $project->goal = $request->goal;
            $project->key = $request->key;

            if ($project->save()) {
                return response()->json(['status' => 'success', 'message' => 'Project Added']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $ticket = Project::findOrFail($id);
            $ticket->createdDate = $request->createdDate;
            $ticket->summary = $request->summary;
            $ticket->status = $request->status;
            $ticket->issueType = $request->issueType;
            $ticket->description = $request->description;
            $ticket->createdBy = $request->createdBy;
            $ticket->projectId = $request->projectId;

            if ($ticket->save()) {
                return response()->json(['status' => 'success', 'message' => 'Project Updated']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $ticket = Project::findOrFail($id);
            if ($ticket->delete()) {
                return response()->json(['status' => 'success', 'message' => 'Ticket Deleted']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

}