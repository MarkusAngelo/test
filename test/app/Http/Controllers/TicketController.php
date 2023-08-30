<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class TicketController extends Controller
{
    public function index()
    {
        return Ticket::all();
    }

    public function store(Request $request)
    {
        try {
            $ticket = new Ticket();
            $ticket->createdDate = $request->createdDate;
            $ticket->summary = $request->summary;
            $ticket->status = $request->status;
            $ticket->issueType = $request->issueType;
            $ticket->description = $request->description;
            $ticket->createdBy = $request->createdBy;
            $ticket->projectId = $request->projectId;

            if ($ticket->save()) {
                return response()->json(['status' => 'success', 'message' => 'Ticket Added']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->createdDate = $request->createdDate;
            $ticket->summary = $request->summary;
            $ticket->status = $request->status;
            $ticket->issueType = $request->issueType;
            $ticket->description = $request->description;
            $ticket->createdBy = $request->createdBy;
            $ticket->projectId = $request->projectId;

            if ($ticket->save()) {
                return response()->json(['status' => 'success', 'message' => 'Ticket Updated']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            if ($ticket->delete()) {
                return response()->json(['status' => 'success', 'message' => 'Ticket Deleted']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function getByProject($projectId)
    {
        $tickets = Ticket::where('projectId', $projectId)->get();
        return $tickets;
    }

    public function createIssue(Request $request)
    {
        try {
            $client = new Client();
            $username = env('JIRA_USERNAME');
            $password = env('JIRA_PASSWORD');
            $endpoint = 'https://coojt.atlassian.net/rest/api/2/issue';
            $data = [
                'fields' => [
                    'project' => [
                        'key' => "BLUEB"
                    ],
                    'summary' => $request['title'],
                    'description' => $request['description'] . '<br>' . $request['user'],
                    'issuetype' => [
                        'name' => $request['type']
                    ]
                ],
            ];
            $response = $client->request('POST', $endpoint, [
                'auth' => [$username, $password],
                'json' => $data, // Include request body data as JSON
            ]);

            $responseBody = $response->getBody()->getContents();
            return response()->json(['status' => 'success', 'data' => $responseBody]);
        } catch (\Exception $e) {
            dd($e);
        }
    }
}