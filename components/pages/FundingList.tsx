// /finantari-nerambursabile/ — every post, newest first (the old page was an empty WordPress blog page).
import PageLayout from "@/components/article/PageLayout";
import PostList from "./PostList";

export default function FundingList() {
  return (
    <PageLayout label="Articole" title="Finanțări nerambursabile">
      <PostList />
    </PageLayout>
  );
}
