import CreatePersonForm from '../../components/createPersonsForm/form';

export default function CreatePersonPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Person</h1>
      <CreatePersonForm />
    </div>
  );
}
