import { TextAnchor } from '@/components/shared/texts/Anchor';

const Hero = () => {
  return (
    <div className="h-screen w-full">
      <p className="text-center">
        {' '}
        Dashing through the snow,
        <br />
        In a one-horse open sleigh,
        <br />
        O&apos;er the fields we go,
        <br />
        Laughing all the way;
        <br />
        Bells on bobtail ring,
        <br />
        Making spirits bright,
        <br />
        What fun it is to ride and sing
        <br />
        <TextAnchor
          href="https://youtu.be/fMCN-b0ic_k?si=pcH-CkVJl4J1bzyn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Very cool anchor link
        </TextAnchor>
        <br />
        Jingle bells, jingle bells,
        <br />
        Jingle all the way!
        <br />
        Oh, what fun it is to ride
        <br />
        In a one-horse open sleigh!
        <br />
      </p>
    </div>
  );
};

export default Hero;
