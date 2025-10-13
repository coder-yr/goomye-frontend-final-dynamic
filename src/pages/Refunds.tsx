import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Plus, MoreHorizontal, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { apiFetch } from "@/lib/api";

export default function Refunds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("last7days");
  const [currentPage, setCurrentPage] = useState(1);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    apiFetch(`/api/returns/my-refunds?page=${currentPage}&status=${filterStatus}&dateRange=${dateRange}`)
      .then((data) => {
        setRefunds(data.refunds || []);
        setTotalPages(data.totalPages || 1);
        setTotalItems(data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load refunds");
        setLoading(false);
      });
  }, [currentPage, filterStatus, dateRange]);

  // Only use dynamic API data, no hardcoded refunds
  const filteredRefunds = refunds.filter((refund) => {
    const matchesSearch = refund.id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || refund.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading refunds...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-semibold text-foreground">My refunds</h1>

        <div className="rounded-lg border border-border bg-card">
          {/* Search and Actions Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-border p-6">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Search
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Last 7 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last90days">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add refund request
              </Button>
            </div>
          </div>

          {/* Filter Radio Buttons */}
          <div className="border-b border-border px-6 py-4">
            <RadioGroup
              value={filterStatus}
              onValueChange={setFilterStatus}
              className="flex items-center gap-6"
            >
              <Label className="text-sm font-normal text-foreground">Show:</Label>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal cursor-pointer">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ongoing" id="ongoing" />
                <Label htmlFor="ongoing" className="font-normal cursor-pointer">
                  Ongoing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="completed" />
                <Label htmlFor="completed" className="font-normal cursor-pointer">
                  Completed
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="denied" id="denied" />
                <Label htmlFor="denied" className="font-normal cursor-pointer">
                  Denied
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">ID</TableHead>
                <TableHead className="font-medium">DUE DATE</TableHead>
                <TableHead className="font-medium">REASON</TableHead>
                <TableHead className="font-medium">STATUS</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRefunds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No refunds found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-medium">{refund.id}</TableCell>
                    <TableCell>{refund.dueDate}</TableCell>
                    <TableCell>{refund.reason}</TableCell>
                    <TableCell>
                      <StatusBadge status={refund.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredRefunds.length > 0 ? ((currentPage - 1) * 10 + 1) : 0}-{filteredRefunds.length > 0 ? ((currentPage - 1) * 10 + filteredRefunds.length) : 0} of {totalItems}
            </p>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {[...Array(totalPages).keys()].map((page) => (
                <Button
                  key={page + 1}
                  variant={currentPage === page + 1 ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 ${
                    currentPage === page + 1
                      ? "bg-ongoing text-ongoing-foreground hover:bg-ongoing/90"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mt-6 text-foreground hover:bg-accent"
          onClick={() => window.location.href = "/"}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Button>
      </div>
    </div>
  );
}

