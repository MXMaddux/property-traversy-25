import Link from "next/link";

type buttonInfoProps = {
  text: string;
  link: string;
  backgroundColor: string;
};

function InfoBox({
  children,
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
}: {
  children: React.ReactNode;
  heading: string;
  backgroundColor: string;
  textColor: string;
  buttonInfo: buttonInfoProps;
}) {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
}

export default InfoBox;
