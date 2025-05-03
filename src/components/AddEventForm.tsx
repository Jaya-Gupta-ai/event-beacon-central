
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { College, Event, EventType } from "@/types";
import { addEvent } from "@/services/eventService";
import { useToast } from "@/hooks/use-toast";

interface AddEventFormProps {
  colleges: College[];
  onEventAdded: () => void;
}

const AddEventForm = ({ colleges, onEventAdded }: AddEventFormProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: new Date(),
    endDate: null as Date | null,
    location: "",
    collegeId: "",
    link: "",
    type: "" as EventType | "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (name: string, date: Date | null) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.date || 
        !formData.location || !formData.collegeId || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Format dates for storage
    const event: Omit<Event, 'id'> = {
      name: formData.name,
      description: formData.description,
      date: format(formData.date, 'yyyy-MM-dd'),
      endDate: formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : undefined,
      location: formData.location,
      collegeId: formData.collegeId,
      link: formData.link || "#",
      type: formData.type as EventType,
    };
    
    // Add event
    addEvent(event);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      date: new Date(),
      endDate: null,
      location: "",
      collegeId: "",
      link: "",
      type: "",
    });
    
    // Close dialog
    setOpen(false);
    
    // Notify parent
    onEventAdded();
    
    // Show toast
    toast({
      title: "Event Added",
      description: "Your event has been successfully added.",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Add a New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid w-full gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Event Name*
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Hackathon 2025"
              required
            />
          </div>
          
          <div className="grid w-full gap-1.5">
            <label htmlFor="description" className="text-sm font-medium">
              Description*
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the event..."
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="date" className="text-sm font-medium">
                Start Date*
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? (
                      format(formData.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleDateChange("date", date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid w-full gap-1.5">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date (Optional)
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="endDate"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(formData.endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate || undefined}
                    onSelect={(date) => handleDateChange("endDate", date)}
                    fromDate={formData.date}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid w-full gap-1.5">
            <label htmlFor="location" className="text-sm font-medium">
              Location*
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Building, Room, etc."
              required
            />
          </div>
          
          <div className="grid w-full gap-1.5">
            <label htmlFor="college" className="text-sm font-medium">
              College*
            </label>
            <Select 
              value={formData.collegeId} 
              onValueChange={(value) => handleSelectChange("collegeId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a college" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {colleges.map(college => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid w-full gap-1.5">
            <label htmlFor="type" className="text-sm font-medium">
              Event Type*
            </label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleSelectChange("type", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="tech">Tech Talk</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid w-full gap-1.5">
            <label htmlFor="link" className="text-sm font-medium">
              Event Link (Optional)
            </label>
            <Input
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://event-website.com"
              type="url"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventForm;
