import SurfaceCard from '@/components/common/SurfaceCard';

interface AssignmentPageLayoutProps {
  header: React.ReactNode;
  list: React.ReactNode;
  footer: React.ReactNode;
}

const AssignmentPageLayout = ({
  header,
  list,
  footer,
}: AssignmentPageLayoutProps) => {
  return (
    <SurfaceCard size='large' className='mx-auto flex flex-col *:px-14.5'>
      <header className='flex flex-col gap-4 justify-start pt-9.5 pb-5.5 border-b border-purple-stroke'>
        {header}
      </header>
      <main className='pt-10'>{list}</main>
      <footer className='mb-8.5 mt-auto'>{footer}</footer>
    </SurfaceCard>
  );
};

export default AssignmentPageLayout;
