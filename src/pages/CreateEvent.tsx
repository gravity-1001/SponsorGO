
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Upload, Info, Plus, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const CreateEvent = () => {
  const [date, setDate] = useState<Date>();
  const [images, setImages] = useState<File[]>([]);
  const [formStep, setFormStep] = useState(1);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImages(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Images uploaded",
        description: `${newFiles.length} image(s) added successfully.`,
      });
      
      // Reset the input value so the same file can be selected again
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    
    toast({
      title: "Image removed",
      description: "The image has been removed from your event.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event submitted for review",
      description: "We've received your event details. Our team will review it and get back to you soon.",
    });
    // This would normally submit the form to an API
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setFormStep(prev => prev - 1);
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-sponsorgo-purple-light/30 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Create Your Event</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              List your college event and connect with potential sponsors who are looking to support initiatives like yours.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className={`font-semibold ${formStep >= 1 ? 'text-sponsorgo-purple' : 'text-gray-400'}`}>Event Details</div>
            <div className={`font-semibold ${formStep >= 2 ? 'text-sponsorgo-purple' : 'text-gray-400'}`}>Media</div>
            <div className={`font-semibold ${formStep >= 3 ? 'text-sponsorgo-purple' : 'text-gray-400'}`}>Sponsorship</div>
            <div className={`font-semibold ${formStep >= 4 ? 'text-sponsorgo-purple' : 'text-gray-400'}`}>Review</div>
          </div>
          <div className="bg-gray-200 h-2 w-full rounded-full">
            <div 
              className="bg-sponsorgo-purple h-full rounded-full transition-all duration-300" 
              style={{ width: `${((formStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {formStep === 1 && "Event Details"}
              {formStep === 2 && "Upload Media"}
              {formStep === 3 && "Sponsorship Information"}
              {formStep === 4 && "Review Your Event"}
            </CardTitle>
            <CardDescription>
              {formStep === 1 && "Provide basic information about your event"}
              {formStep === 2 && "Upload photos and videos to showcase your event"}
              {formStep === 3 && "Set your sponsorship needs and packages"}
              {formStep === 4 && "Review all information before submitting"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              {formStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name *</Label>
                    <Input 
                      id="eventName" 
                      placeholder="e.g., TechHacks 2025" 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="competition">Competition</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                          <SelectItem value="exhibition">Exhibition</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="university">University/College *</Label>
                      <Input 
                        id="university" 
                        placeholder="e.g., Stanford University" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Event Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expectedAttendees">Expected Attendees *</Label>
                      <Input 
                        id="expectedAttendees" 
                        type="number" 
                        placeholder="e.g., 200" 
                        min="1" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Venue/Location *</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Computer Science Building, Stanford University" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your event, its purpose, activities, and why sponsors should be interested..." 
                      rows={6}
                      required 
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Be specific about what makes your event unique and the value it offers to sponsors.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Event Website (Optional)</Label>
                      <Input 
                        id="website" 
                        type="url" 
                        placeholder="e.g., https://techhacks-stanford.edu" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input 
                        id="contactEmail" 
                        type="email" 
                        placeholder="e.g., organizers@techhacks-stanford.edu" 
                        required 
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {formStep === 2 && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <Upload className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="text-lg font-medium">Upload Event Images</h3>
                      <p className="text-sm text-gray-500 mx-auto max-w-md">
                        Upload high-quality images of previous editions or mockups of your event. This helps sponsors visualize your event better.
                      </p>
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <Input 
                            type="file"
                            accept="image/*"
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                          />
                          <Button type="button" variant="outline">Select Images</Button>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {images.length > 0 && (
                    <>
                      <h3 className="font-medium">Uploaded Images ({images.length})</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                              <img 
                                src={URL.createObjectURL(image)} 
                                alt={`Preview ${index}`} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <button
                              type="button"
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                            <p className="text-xs mt-1 truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex gap-3">
                      <Info className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-700 mb-1">Tips for Great Event Photos</h4>
                        <ul className="text-sm text-blue-600 space-y-1 list-disc pl-4">
                          <li>Include images from previous editions if available</li>
                          <li>Show the venue and attendees engaged in activities</li>
                          <li>Include any notable past sponsors or speakers</li>
                          <li>Ensure images are clear, well-lit, and high-resolution</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {formStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="sponsorshipGoal">Sponsorship Goal *</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <DollarSign className="h-5 w-5" />
                      </span>
                      <Input 
                        id="sponsorshipGoal" 
                        type="number" 
                        min="0" 
                        step="100" 
                        placeholder="e.g., 10000" 
                        className="pl-10"
                        required 
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      The total amount of sponsorship you're seeking for your event.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sponsorship Packages *</Label>
                    <p className="text-sm text-gray-600 mb-2">
                      Create different sponsorship tiers with their associated benefits.
                    </p>
                    
                    <Card className="mb-4">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Gold Sponsor Package</CardTitle>
                          <div className="text-sponsorgo-purple font-bold">$5,000+</div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <Label htmlFor="goldBenefits">Benefits</Label>
                          <Textarea 
                            id="goldBenefits" 
                            placeholder="List the benefits for gold sponsors..."
                            defaultValue="- Prime logo placement on event materials and website
- Keynote speaking opportunity
- First access to participant resumes
- Dedicated mentorship sessions
- VIP booth location
- Social media promotion" 
                            rows={4}
                            required 
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mb-4">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Silver Sponsor Package</CardTitle>
                          <div className="text-sponsorgo-purple font-bold">$2,500+</div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <Label htmlFor="silverBenefits">Benefits</Label>
                          <Textarea 
                            id="silverBenefits" 
                            placeholder="List the benefits for silver sponsors..."
                            defaultValue="- Logo on event materials and website
- Send mentors and judges
- Access to participant resumes
- Booth at the event
- Social media mention" 
                            rows={4}
                            required 
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mb-4">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Bronze Sponsor Package</CardTitle>
                          <div className="text-sponsorgo-purple font-bold">$1,000+</div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <Label htmlFor="bronzeBenefits">Benefits</Label>
                          <Textarea 
                            id="bronzeBenefits" 
                            placeholder="List the benefits for bronze sponsors..."
                            defaultValue="- Logo on event website
- Send mentors
- Brand recognition during event
- Access to participant resumes" 
                            rows={4}
                            required 
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Button type="button" variant="outline" className="w-full flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Add Another Package
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sponsorshipDeadline">Sponsorship Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a deadline</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-500">
                      The last date by which sponsors can commit to supporting your event.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes for Sponsors (Optional)</Label>
                    <Textarea 
                      id="additionalNotes" 
                      placeholder="Any additional information you want to provide to potential sponsors..."
                      rows={4}
                    />
                  </div>
                </div>
              )}
              
              {formStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-700 mb-1">Submission Review</h4>
                        <p className="text-sm text-green-600">
                          Please review all information before submitting. Your event will be reviewed by our team before being listed publicly.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="border-gray-200 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Event Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">Event Name:</dt>
                          <dd>TechHacks 2025</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">Event Type:</dt>
                          <dd>Hackathon</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">University/College:</dt>
                          <dd>Stanford University</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">Event Date:</dt>
                          <dd>May 15, 2025</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">Expected Attendees:</dt>
                          <dd>500</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">Location:</dt>
                          <dd>Computer Science Building, Stanford University</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px] shrink-0">Description:</dt>
                          <dd className="text-sm text-gray-700">
                            A 48-hour hackathon challenging students to build innovative solutions for real-world problems. Sponsored by top tech companies with mentorship opportunities.
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-200 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Media</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-3">{images.length} images uploaded</p>
                      {images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {images.map((image, index) => (
                            <div key={index} className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                              <img 
                                src={URL.createObjectURL(image)} 
                                alt={`Preview ${index}`} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No images uploaded</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-200 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Sponsorship Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">Sponsorship Goal:</dt>
                          <dd>$10,000</dd>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px] shrink-0">Packages:</dt>
                          <dd className="space-y-2">
                            <div>
                              <div className="font-medium">Gold: $5,000+</div>
                              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                                <li>Prime logo placement on event materials and website</li>
                                <li>Keynote speaking opportunity</li>
                                <li>First access to participant resumes</li>
                                <li>Dedicated mentorship sessions</li>
                                <li>VIP booth location</li>
                                <li>Social media promotion</li>
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium">Silver: $2,500+</div>
                              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                                <li>Logo on event materials and website</li>
                                <li>Send mentors and judges</li>
                                <li>Access to participant resumes</li>
                                <li>Booth at the event</li>
                                <li>Social media mention</li>
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium">Bronze: $1,000+</div>
                              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                                <li>Logo on event website</li>
                                <li>Send mentors</li>
                                <li>Brand recognition during event</li>
                                <li>Access to participant resumes</li>
                              </ul>
                            </div>
                          </dd>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium text-gray-500 sm:min-w-[180px]">Sponsorship Deadline:</dt>
                          <dd>April 15, 2025</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="confirm" 
                        className="rounded border-gray-300 text-sponsorgo-purple focus:ring-sponsorgo-purple"
                        required
                      />
                      <Label htmlFor="confirm" className="text-sm">
                        I confirm that all the information provided is accurate and I agree to SponsorGO's <Link to="/terms" className="text-sponsorgo-purple hover:underline">Terms of Service</Link>.
                      </Label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {formStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                {formStep < 4 ? (
                  <Button 
                    type="button" 
                    className="ml-auto bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark" 
                    onClick={nextStep}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="ml-auto bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark"
                  >
                    Submit Event
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

import { DollarSign } from "lucide-react";

export default CreateEvent;
