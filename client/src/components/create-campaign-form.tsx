"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { writeContract } from "@wagmi/core";

import { createCampaignSchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";
import { abi, CONTRACT_ADDRESS } from "@/lib/contract";
import { useAccount } from "wagmi";

const CreateCampaignForm = () => {
  const form = useForm<z.infer<typeof createCampaignSchema>>({
    resolver: zodResolver(createCampaignSchema),
  });

  const { address } = useAccount();

  const onSubmit = async (data: z.infer<typeof createCampaignSchema>) => {
    const { title, description, target, deadline, image } = data;
    try {
      const result = await writeContract(config, {
        abi,
        address: CONTRACT_ADDRESS,
        functionName: "createCampaign",
        args: [address, title, description, target, deadline, image],
      });
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-gray-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-gray-100">
          Create New Campaign
        </CardTitle>
        <p className="text-sm text-gray-400">
          Fill in the details below to create your new campaign
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">
                      Campaign Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter campaign title"
                        className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-green-500 focus:border-green-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter campaign description"
                        className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-green-500 focus:border-green-500 min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">
                      Target Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter target amount"
                        className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-green-500 focus:border-green-500"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-200">Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700",
                              !field.value && "text-gray-500"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-gray-800 border-gray-700"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="bg-gray-800 text-gray-200"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Image URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter image URL"
                        className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-green-500 focus:border-green-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              Create Campaign
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCampaignForm;
