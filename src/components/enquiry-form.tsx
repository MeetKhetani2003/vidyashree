"use client";

import { FormEvent, useState } from "react";
import { IconArrowUpRight, IconCheck } from "@/components/icons";

const initialForm = { student: "", parent: "", mobile: "", email: "", className: "", stream: "", message: "" };

export function EnquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="success-icon"><IconCheck size={27} /></div>
        <p className="eyebrow">Message received</p>
        <h2>Thank you for reaching out.</h2>
        <p>Our academic team will call you soon to understand the student’s goals and suggest a thoughtful next step.</p>
        <button className="text-button" type="button" onClick={() => { setSubmitted(false); setForm(initialForm); }}>Send another enquiry <IconArrowUpRight size={16} /></button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-row"><label>Student name<input required value={form.student} onChange={(e) => update("student", e.target.value)} placeholder="Full name" /></label><label>Parent / guardian name<input required value={form.parent} onChange={(e) => update("parent", e.target.value)} placeholder="Full name" /></label></div>
      <div className="form-row"><label>Mobile number<input required type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 00000 00000" /></label><label>Email address<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label></div>
      <div className="form-row"><label>Current class<select required value={form.className} onChange={(e) => update("className", e.target.value)}><option value="">Choose class</option><option>Class X</option><option>Class XI</option><option>Class XII</option><option>Recent graduate</option></select></label><label>Subject / stream<select required value={form.stream} onChange={(e) => update("stream", e.target.value)}><option value="">Choose interest</option><option>+2 Science · PCMB</option><option>Physics</option><option>Chemistry</option><option>Biology</option><option>Mathematics</option><option>Not sure yet</option></select></label></div>
      <label>How can we help?<textarea required value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us a little about the student’s goals or questions..." rows={5} /></label>
      <div className="form-submit-row"><button className="button button-red" type="submit">Submit enquiry <IconArrowUpRight size={17} /></button><span>We respect your time and privacy.</span></div>
    </form>
  );
}
