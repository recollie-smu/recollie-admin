import type { Reminder, ReminderData } from "@/types/reminder";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ref, type Ref } from "vue";

const supabase: SupabaseClient = createClient(
  "https://mwfpdptcrkbvcslxkhup.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13ZnBkcHRjcmtidmNzbHhraHVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODcwNjkzMCwiZXhwIjoxOTk0MjgyOTMwfQ.BsX8cpCNSWzqlhJlHCm_Yhc9sG4oiM-oPW1Om_Wiqsg"
);

// const channel: Ref<RealtimeChannel | null> = ref(null);
// const users = ref(new Set<string>());

// const openOrCreateChannel = (channelName: string, username: string) => {
//   const currChannel = supabase.channel(channelName, {
//     config: {
//       presence: {
//         key: username,
//       },
//     },
//   });
//   channel.value = currChannel.subscribe(async (status) => {
//     if (status === "SUBSCRIBED") {
//       await currChannel.track({
//         online_at: new Date().toISOString(),
//       });
//     }
//   });
// };

const addReminder = async (reminder: ReminderData) => {
  await supabase.from("reminders").insert(reminder);
};

const deleteReminder = async (reminderId: number) => {
  await supabase.from("reminders").delete().eq("id", reminderId);
};

const updateReminder = async (reminder: ReminderData, reminderId: number) => {
  await supabase.from("reminders").update(reminder).eq("id", reminderId);
};

const getReminder = async (reminderId: number) => {
  const { data, error } = await supabase
    .from("reminders")
    .select()
    .eq("id", reminderId);
  if (data && data.length > 0) {
    return data[0] as Reminder;
  }
  return null;
};

const getReminders = async () => {
  const { data, error } = await supabase.from("reminders").select();
  if (data && data.length > 0) {
    return data as Reminder[];
  }
  return [];
};

const getBucket = async () => {
  const { data, error } = await supabase.storage.listBuckets();
  console.log(data);
};

const addMemo = async (file: File, reminderName: string) => {
  let retUrl = "";
  const { data, error } = await supabase.storage
    .from("memo")
    .upload(`public/${reminderName}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (data && data.path) {
    const { data: publicUrl } = supabase.storage
      .from("memo")
      .getPublicUrl(data.path);
    retUrl = publicUrl.publicUrl;
  }
  return retUrl;
};
const addImage = async (file: File, reminderName: string) => {
  let retUrl = "";
  const { data, error } = await supabase.storage
    .from("image")
    .upload(`public/${reminderName}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (data && data.path) {
    const { data: publicUrl } = supabase.storage
      .from("image")
      .getPublicUrl(data.path);
    retUrl = publicUrl.publicUrl;
  }
  return retUrl;
};

export {
  supabase,
  addReminder,
  deleteReminder,
  updateReminder,
  getReminder,
  getReminders,
  getBucket,
  addImage,
  addMemo,
};
