import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Route } from './+types/contact';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Uro Lyi - Personal Website - Contact' },
    {
      name: 'description',
      content: 'Contact Uro Lyi',
    },
  ];
}

export default function Contact() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      fromName: '',
      replyTo: '',
      message: '',
    },
  });

  const onSubmit = (data: any) => {
    emailjs
      .send('urolyi.website', 'website_contact_template', data, {
        publicKey: 'MFb8HF03xdeuXo8ct',
        limitRate: {
          throttle: 5000,
        },
      })
      .then(() => {
        navigate('/contact/success');
      });
  };

  return (
    <div className="flex flex-col gap-4 h-3/4 w-5/8 p-10">
      <b className="text-3xl">Contact Me</b>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="fromName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="replyTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-40"
                    placeholder="Hello Uro..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
